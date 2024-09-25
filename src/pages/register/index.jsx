import { useNavigate } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  TermosText,
  ContaText,
  LoginText,
  Row,
  Wrapper,
} from './styles';

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'No mínimo 3 caracteres')
      .required('Campo obrigatório'),
    email: yup
      .string()
      .email('Email não é válido')
      .required('Campo obrigatório'),
    password: yup
      .string()
      .min(3, 'No mínimo 3 caracteres')
      .required('Campo obrigatório'),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post('/users', formData);

      if (data.id) {
        navigate('/feed');
        return;
      }

      alert('Houve um erro, tente novamente');
    } catch (e) {
      alert('Houve um erro, tente novamente');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome completo"
                leftIcon={<MdPerson />}
                name="name"
                control={control}
                errorMessage={errors.name?.message}
              />
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
                errorMessage={errors.email?.message}
              />
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="password"
                control={control}
                errorMessage={errors.password?.message}
              />
              <Button
                title="Criar minha conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <Row>
              <TermosText>
                Ao clicar em "criar minha conta grátis", declaro que aceito as
                Políticas de Privacidade e os Termos de Uso da DIO.
              </TermosText>
            </Row>
            <ContaText>
              Já tenho conta.
              <LoginText href="/login">Fazer Login</LoginText>
            </ContaText>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Register };
