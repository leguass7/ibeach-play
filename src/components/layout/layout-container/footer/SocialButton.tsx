import { Button, VisuallyHidden } from '@chakra-ui/react'

type SocialButtonProps = {
  children: React.ReactNode
  label: string
  href: string
}

export const SocialButton: React.FC<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <Button
      bg={'primary.200'}
      rounded={'full'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      height={'50px'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'primary.100'
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}
