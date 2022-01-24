import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent backgroundColor={'pGray.800'}>
        <Image src={imgUrl} />
        <Link href={imgUrl} isExternal p='2'>
          Abrir original
        </Link>
      </ModalContent>
    </Modal>
  )
}
