import { FormChangePassword } from '@/components/Forms/FormChangePassword'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Button, Divider } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const MePage: NextPage = () => {
  const navigation = useRouter()

  const handleGoHome = () => {
    navigation.push('/')
  }

  return (
    <LayoutContainer>
      <div>
        <h1>Página com informações do usuário logado</h1>
        <p>Essa página deve conter:</p>
        <ul>
          <li>Form para usuário alterar seus dados cadastrais</li>
          <li>Forma do usuário trocar cadastrar ou trocar senha de acesso</li>
          <li>Forma do usuário trocar sua foto de perfil</li>
          <li>Resumo com informações gerarais de reservas</li>
          <li>Resumo com informações gerarais de avaliações</li>
          <li>Deve fornecer possibilidade de excluir sua conta</li>
          <li>Deve fornecer possibilidade de baixar suas próprias informações armazenadas no app</li>
        </ul>
        <Button onClick={handleGoHome}>Voltar para Home</Button>
        <Divider></Divider>
        <FormChangePassword />
      </div>
    </LayoutContainer>
  )
}

export default MePage
