import { Alert } from "./ui/alert";

export interface SuccessResponse {
  status: 201;
  message: string; // Mensagem de sucesso
}

export interface ErrorResponse {
  status: 400 | 500;
  error: string; // Mensagem de erro
}

export type HttpResponse = SuccessResponse | ErrorResponse | null;

interface AlertModalProps {
  response: HttpResponse;
}

export function AlertModal({ response }: AlertModalProps) {
  let variant: "default" | "destructive" | null = null;
  let message: string;
  let Icon: React.FC<React.SVGProps<SVGSVGElement>>;

  if (response?.status === 201) {
    variant = "default";
    message = response.message;
    Icon = CircleCheckIcon;
  } else if (response?.status === 400 || response?.status === 500) {
    variant = "destructive";
    message = response.error;
    Icon = TriangleAlertIcon;
  } else {
    variant = "default";
    message = "Resposta não reconhecida.";
    Icon = TriangleAlertIcon;
  }

  return (
    <div>
      <Alert variant={variant}>
        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <Icon className="size-12" />
          <p className="text-lg font-medium">{message}</p>
        </div>
      </Alert>
    </div>
  );
}

function CircleCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
