import { Alert } from "react-native";

interface ShowYesNoAlertProps {
  title?: string;
  message: string;
  onYes: () => void;
  onNo?: () => void;
}

export function AlertModal({
  title = "Are you sure?",
  message,
  onYes,
  onNo,
}: ShowYesNoAlertProps) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "No",
        style: "cancel",
        onPress: () => onNo?.(),
      },
      {
        text: "Yes",
        onPress: onYes,
      },
    ],
    { cancelable: true }
  );
}
