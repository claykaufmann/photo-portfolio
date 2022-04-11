import { HStack, Text, Link } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import * as React from 'react'

interface props {
  textColor: string
}

const Footer: React.VFC<props> = ({ textColor }) => {
  return (
    <React.Fragment>
      <HStack marginLeft="1rem" marginBottom="0.2rem">
        <Link
          href="https://claykaufmann.com"
          textColor={textColor}
          isExternal={true}
        >
          Clay Kaufmann 2022
        </Link>

        <Link href="https://www.instagram.com/byclaykay/" isExternal={true}>
          <IconButton
            color={textColor}
            colorScheme="whiteAlpha"
            aria-label="Instagram profile link"
            as={AiOutlineInstagram}
            _hover={{ transform: 'translateY(-3px)' }}
            variant="ghost"
            size="xs"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/in/claykaufmann/"
          isExternal={true}
        >
          <IconButton
            color={textColor}
            colorScheme="whiteAlpha"
            aria-label="LinkedIn profile link"
            as={AiOutlineLinkedin}
            _hover={{ transform: 'translateY(-3px)' }}
            variant="ghost"
            size="xs"
          />
        </Link>
        <Link href="mailto:claykaufmann@gmail.com">
          <IconButton
            color={textColor}
            colorScheme="whiteAlpha"
            aria-label="Email link"
            as={AiOutlineMail}
            _hover={{ transform: 'translateY(-3px)' }}
            variant="ghost"
            size="xs"
          />
        </Link>
      </HStack>
    </React.Fragment>
  )
}

export default Footer
