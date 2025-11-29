import { ChevronDown, ChevronUp } from "lucide-react";

interface ChevronStateProps {
  state: boolean;
}

const chevronCL: string = 'transition-transform duration-200 group-[.dropdown-open]:rotate-180'

export const ChevronState = ({ state }: ChevronStateProps) =>
  state ? <ChevronUp className={chevronCL} size={22} /> : <ChevronDown className={chevronCL} size={22} />;