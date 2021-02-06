import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SmoothCollapse from 'react-smooth-collapse';
import { useFormik } from 'formik';
import { RootState } from '../../../redux-toolkit/store';
import { loadCommentsByPost /*  addNewComment */ } from '../../../redux-toolkit/postsSlice';

import IComment from '../../../types/comment';
import { IUser } from '../../../types/user';

import ErrorBlock from '../../errorBlock';
import Loader from '../../Loader';
import UserInfo from '../UserInfo/UserInfo';
import ShowMoreBtn from '../ShowMoreBtn';

import {
  AvatarMin,
  FormWrapper,
  Input,
  SubmitComment,
  Container,
  Title,
  CommentList,
  CommentItem,
  Comment,
} from './Comments.styles';

interface StateProps {
  user: null | IUser;
}

interface DispatchProps {
  getComments: (id: number) => void;
  /* addComment: (postId: number, comment: ICreateComment) => void; */
}

type CommentFormProps = {
  avatar: string | undefined;
  submitNewComment: (comment: string) => void;
};

type CommentsProps = StateProps &
  DispatchProps & {
    id: number;
    comments?: IComment[];
    loading: boolean;
    error: Error | null;
    showComments: boolean;
    setShowComments: () => void;
  };

const mapStateToProps = (state: RootState): StateProps => ({
  user: state.currentUser.data,
});

const mapDispatchToProps = {
  getComments: loadCommentsByPost,
  /* addComment: addNewComment, */
};

const CommentForm = ({ avatar, submitNewComment }: CommentFormProps): JSX.Element => {
  const formik = useFormik({
    initialValues: { comment: '' },
    onSubmit: (values, actions) => {
      submitNewComment(values.comment);
      actions.resetForm();
    },
  });
  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <AvatarMin src={avatar} />
      <Input name="comment" onChange={formik.handleChange} value={formik.values.comment} />
      <SubmitComment type="submit" />
    </FormWrapper>
  );
};

const Comments = ({
  id,
  user,
  comments,
  loading,
  error,
  getComments,
  showComments,
  setShowComments,
}: /*  addComment, */
CommentsProps): JSX.Element => {
  useEffect(() => {
    getComments(id);
  }, [id, getComments]);

  const renderComments = (): JSX.Element | JSX.Element[] => {
    if (loading || !comments) return <Loader />;
    if (error) return <ErrorBlock errorMessage="Error occured with loading comments." />;
    return comments?.map((item) => {
      const {
        userDto: { firstName, lastName, avatar },
        lastRedactionDate,
        comment,
        id: commentId,
      } = item;
      return (
        <CommentItem key={commentId}>
          <UserInfo
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            date={lastRedactionDate}
          />
          <Comment>{comment}</Comment>
        </CommentItem>
      );
    });
  };

  const submitNewComment = async () => {
    // const data: ICreateComment = {
    //   comment,
    //   userDto: user!,
    // };
    console.log('СЛОМАЛСЯ ЭНДПОИНТ НА ОТПРАВКУ НОВОГО КОММЕНТАРИЯ');
    /* await addComment(id, data!); */
    await getComments(id);
  };

  return (
    <Container>
      <Title>Комментарии</Title>
      <CommentList as={SmoothCollapse} expanded={showComments}>
        {renderComments()}
      </CommentList>
      <CommentForm avatar={user?.avatar} submitNewComment={submitNewComment} />
      <ShowMoreBtn changeIcon={showComments} heightHandler={setShowComments} />
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
