import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useAuthedUser } from "~/utils/user-context";

interface Inputs {
  title: string;
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: FC<Props> = ({ isOpen, onClose }) => {
  const { user } = useAuthedUser();
  const { mutateAsync, isLoading } = api.post.createPost.useMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ shouldUnregister: true });

  const apiUtils = api.useContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await mutateAsync({
        title: data.title,
        content: data.content,
        authorId: user?.id!,
      });
      await apiUtils.post.invalidate();
      onClose();
    } catch (error) {
      console.log("Error creating new post", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.title} mb="4">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              size="sm"
              {...register("title", {
                required: "The title is required",
              })}
            />
            <FormErrorMessage>
              {!!errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.content} mb="4">
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              id="content"
              size="sm"
              {...register("content", {
                required: "The content is required",
              })}
            />
            <FormErrorMessage>
              {!!errors.content && errors.content.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" size="sm" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" isLoading={isLoading} variant="solid" size="sm">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
