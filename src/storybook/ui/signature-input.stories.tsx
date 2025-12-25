import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import SignatureInput from "@/components/ui/signature-input";

const meta: Meta<typeof SignatureInput> = {
  title: "UI/SignatureInput",
  component: SignatureInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SignatureInput>;

export const Default: Story = {
  render: () => {
    const [signature, setSignature] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-md">
          <SignatureInput onSignatureChange={setSignature} />
        </div>
        {signature && (
          <p className="text-sm text-muted-foreground">
            Signature captured (data URL length: {signature.length})
          </p>
        )}
      </div>
    );
  },
};

export const WithExternalRef: Story = {
  render: () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signature, setSignature] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-md">
          <SignatureInput
            canvasRef={canvasRef}
            onSignatureChange={setSignature}
          />
        </div>
        {signature && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Signature preview:</p>
            <img
              src={signature}
              alt="Signature preview"
              className="border border-gray-300 rounded-md w-[200px] h-[100px] object-contain bg-white"
            />
          </div>
        )}
      </div>
    );
  },
};

export const WithInstructions: Story = {
  render: () => {
    const [signature, setSignature] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Please sign below:</p>
          <p className="text-xs text-muted-foreground">
            Use your mouse or touch to draw your signature. Click the eraser
            button to clear.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-md">
          <SignatureInput onSignatureChange={setSignature} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Status:</span>
          {signature ? (
            <span className="text-sm text-green-600">Signature captured</span>
          ) : (
            <span className="text-sm text-muted-foreground">
              No signature yet
            </span>
          )}
        </div>
      </div>
    );
  },
};

export const LightBackground: Story = {
  render: () => {
    const [signature, setSignature] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm font-medium text-gray-700">
          Light background variant:
        </p>
        <div className="bg-white rounded-md shadow-sm">
          <SignatureInput onSignatureChange={setSignature} />
        </div>
        {signature && (
          <p className="text-sm text-gray-600">Signature captured!</p>
        )}
      </div>
    );
  },
};

export const DarkBackground: Story = {
  render: () => {
    const [signature, setSignature] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm font-medium text-gray-200">
          Dark background variant:
        </p>
        <div className="bg-gray-900 rounded-md">
          <SignatureInput onSignatureChange={setSignature} />
        </div>
        {signature && (
          <p className="text-sm text-gray-400">Signature captured!</p>
        )}
      </div>
    );
  },
};
