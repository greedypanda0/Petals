import { ReactNode } from "react";

export type CardWrapperProps = {
  headerTitle: string;
  headerLabel?: string;
  children?: ReactNode;
  cardFooter?: ReactNode;
  className?: string;
};
