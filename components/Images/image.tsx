import * as React from 'react'
import { Photo } from '../../types/types'
import Image from 'next/image'
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'

type Props = {
  image: Photo
}

const Photo: React.VFC<Props> = ({ image }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <React.Fragment>
      <Flex justify="center">
        <div onClick={onOpen}>
          <Image
            src={image.url}
            width={image.width}
            height={image.height}
            alt="test"
            className="portfolio-img"
          />
          <style jsx global>
            {`
              .portfolio-img {
                align-self: center;
              }
            `}
          </style>
        </div>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding="2.1rem" backgroundColor="light-grey">
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt="test"
              className="portfolio-img"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default Photo
