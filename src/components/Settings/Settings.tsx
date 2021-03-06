import React from 'react';
import { useForm } from 'react-hook-form';
import Page from '../../common/Page';
import Chip from '../../common/Chip';
import UserBlock from './form/userBlock';
import AuthBlock from './form/authBlock';
import ContactsBlock from './form/сontactsBlock';
import AboutMeBlock from './form/aboutMeBlock';
import { SettingsWrapper, ContainerLast, Btn } from './Settings.style';

const Settings: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm();

  return (
    <Page>
      <SettingsWrapper>
        <Chip>Настройки</Chip>
        <form>
          <UserBlock />
          <AuthBlock />
          <ContactsBlock />
          <AboutMeBlock />
          <ContainerLast>
            <Btn type="submit" value="Сохранить">
              Сохранить
            </Btn>
          </ContainerLast>
        </form>
      </SettingsWrapper>
    </Page>
  );
};

export default Settings;
