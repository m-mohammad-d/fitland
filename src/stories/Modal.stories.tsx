import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/ui/Modal";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "ui/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const Template = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="m-4 rounded bg-blue-500 px-4 py-2 text-white">
        باز کردن مودال
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="mb-2 text-xl font-bold">سلام!</h2>
        <p>این یک مودال ساده است که با کلیک بیرون یا کلید Escape بسته می‌شود.</p>
      </Modal>
    </>
  );
};

export const Default = {
  render: Template,
};

export const WithLongContent = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="m-4 rounded bg-blue-500 px-4 py-2 text-white">
          نمایش مودال طولانی
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="max-h-[60vh] space-y-4 overflow-y-auto">
            <h2 className="text-xl font-bold">محتوای زیاد</h2>
            {[...Array(30)].map((_, i) => (
              <p key={i}>این خط شماره {i + 1} است</p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <button onClick={() => setIsOpen(true)} className="m-4 rounded bg-red-500 px-4 py-2 text-white">
          حذف آیتم
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className="mb-4 text-lg font-semibold">آیا مطمئن هستید؟</h3>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsOpen(false)} className="rounded bg-gray-300 px-4 py-2">
              لغو
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                alert("حذف شد");
              }}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              حذف
            </button>
          </div>
        </Modal>
      </>
    );
  },
};
