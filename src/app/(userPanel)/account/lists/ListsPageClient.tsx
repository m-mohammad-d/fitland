"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_LIST, DELETE_LIST, GET_USER_LISTS, UPDATE_LIST } from "@/graphql/queries/lists";
import Modal from "@/components/ui/Modal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ListForm from "@/components/account/ListForm";
import ListCard from "@/components/account/ListCard";
import ListHeader from "@/components/account/ListHeader";
import { List } from "@/types/lists";
import EmptyState from "@/components/ui/EmptyState";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "@/components/ui/Button";

export default function ListsPageClient() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { data, loading } = useQuery(GET_USER_LISTS);
  const [createList] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: GET_USER_LISTS }],
  });
  const [updateList] = useMutation(UPDATE_LIST, {
    refetchQueries: [{ query: GET_USER_LISTS }],
  });
  const [deleteList] = useMutation(DELETE_LIST, {
    refetchQueries: [{ query: GET_USER_LISTS }],
  });

  const handleViewDetails = (listId: string) => {
    router.push(`/account/lists/${listId}`);
  };

  const handleCreateList = async ({ title }: { title: string }) => {
    try {
      await createList({
        variables: { title },
      });
      setIsCreating(false);
      setNewTitle("");
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleUpdateList = async ({ title }: { title: string }) => {
    if (!isEditing) return;
    try {
      await updateList({
        variables: {
          id: isEditing,
          title,
        },
      });
      setIsEditing(null);
      setNewTitle("");
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleDeleteList = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteList({
        variables: {
          id: deleteConfirmId,
        },
      });
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ListHeader onCreateClick={() => setIsCreating(true)} />

      {/* Create List Modal */}
      <Modal
        isOpen={isCreating}
        onClose={() => {
          setIsCreating(false);
          setNewTitle("");
        }}
      >
        <ListForm
          onSubmit={handleCreateList}
          onCancel={() => {
            setIsCreating(false);
            setNewTitle("");
          }}
          submitText="ایجاد"
          cancelText="انصراف"
          title="ایجاد فهرست جدید"
        />
      </Modal>

      <Modal
        isOpen={!!isEditing}
        onClose={() => {
          setIsEditing(null);
          setNewTitle("");
        }}
      >
        <ListForm
          initialTitle={newTitle}
          onSubmit={handleUpdateList}
          onCancel={() => {
            setIsEditing(null);
            setNewTitle("");
          }}
          submitText="ذخیره"
          cancelText="انصراف"
          title="ویرایش فهرست"
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteList}
        title="حذف فهرست"
        description="آیا از حذف این فهرست اطمینان دارید؟"
        confirmText="حذف"
        cancelText="انصراف"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {data?.getUserLists.length === 0 ? (
            <div className="col-span-full">
              <EmptyState 
                title="هیچ فهرستی ثبت نشده است" 
                icon={<AiOutlineHeart className="w-12 h-12 text-primary" size={40} />} 
                description="شما هنوز فهرستی ثبت نکرده‌اید. با استفاده از دکمه زیر فهرست جدید ثبت کنید." 
                action={<Button  onClick={() => setIsCreating(true)}>ایجاد فهرست</Button>}
              />
            </div>
          ) : (
            data?.getUserLists.map((list: List) => (
              <ListCard
                key={list.id}
                list={list}
                onEdit={(id, title) => {
                  setIsEditing(id);
                  setNewTitle(title);
                }}
                onDelete={setDeleteConfirmId}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
