import { AppRouter } from "../AppRouter";
import { ModalProvider } from "../modal";

export const App = () => (
  <ModalProvider>
    <AppRouter />
  </ModalProvider>
);
