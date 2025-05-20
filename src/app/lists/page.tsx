const handleCreateList = async (data: { title: string }) => {
  try {
    setIsLoading(true);
    const response = await fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('خطا در ایجاد فهرست');
    }

    const newList = await response.json();
    setLists((prev) => [...prev, newList]);
    setIsCreateModalOpen(false);
    toast.success('فهرست با موفقیت ایجاد شد');
  } catch (error) {
    console.error('Error creating list:', error);
    toast.error('خطا در ایجاد فهرست');
  } finally {
    setIsLoading(false);
  }
};

const handleEditList = async (data: { title: string }) => {
  if (!editingList) return;

  try {
    setIsLoading(true);
    const response = await fetch(`/api/lists/${editingList.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('خطا در ویرایش فهرست');
    }

    const updatedList = await response.json();
    setLists((prev) =>
      prev.map((list) => (list.id === editingList.id ? updatedList : list))
    );
    setIsEditModalOpen(false);
    toast.success('فهرست با موفقیت ویرایش شد');
  } catch (error) {
    console.error('Error updating list:', error);
    toast.error('خطا در ویرایش فهرست');
  } finally {
    setIsLoading(false);
  }
}; 