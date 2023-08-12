import { useState } from "react";

import { Button } from "@mantine/core";

export type ActionButtonProps = {
  onAddHandler: () => void
}

export default function ActionButton ({ onAddHandler } : ActionButtonProps) {
  const [actionButton, setActionButton] = useState({
    content: "Action",
    variant: "filled",
  });

  return (
    <Button
      variant={actionButton.variant}
      onClick={onAddHandler}
      onMouseOver={(event) => {
        // console.log("mouse over", event);
        if (event.type === "mouseover")
          setActionButton({
            content: "Create new event",
            variant: "outline",
          });
      }}
      onMouseLeave={(event) => {
        // console.log("mouse leave", event);
        if (event.type === "mouseleave")
          setActionButton({ content: "Action", variant: "filled" });
      }}
    >
      {actionButton.content}
    </Button>
  );
}
