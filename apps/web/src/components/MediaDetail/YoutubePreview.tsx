import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface YoutubePreviewProps {
	title: string;
	youtubeVideoId: string;
	isOpen: boolean;
	onClose: () => void;
}

export const YoutubePreview: React.FC<YoutubePreviewProps> = ({
	title,
	youtubeVideoId,
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="5xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textTransform="capitalize">{title} Trailer</ModalHeader>
				<ModalCloseButton />
				<ModalBody
					display="flex"
					alignItems="center"
					justifyContent="center"
					pb={5}
				>
					<iframe
						width="853"
						height="480"
						src={`https://www.youtube.com/embed/${youtubeVideoId}`}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						title="Embedded youtube"
						style={{ borderRadius: 6 }}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
