import { createModalProvider } from "./provider";
import DefaultModal from "./defaultModal";
import ErrorModal from "./errorModal";

const modals = {
  default: DefaultModal,
  error: ErrorModal,
};

export const { useModal, ModalProvider } = createModalProvider(modals);
