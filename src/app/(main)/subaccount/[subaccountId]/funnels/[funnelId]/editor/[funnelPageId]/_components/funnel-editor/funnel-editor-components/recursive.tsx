import { EditorElement } from "@/app/providers/editor/editor-provider";

import { TextComponent } from "./textComponent";
import { Container } from "./container";

type Props = {
  element: EditorElement;
};

export const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    default:
      return null;
  }
};
