import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { ADD_ADDRESS } from "@/graphql/mutations/AddressMutation";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { GET_USER_ADDRESS } from "@/graphql/queries/addressQueries";
import { useRouter } from "next/navigation";

const addressSchema = z.object({
  province: z.string().min(1, "استان الزامی است"),
  city: z.string().min(1, "شهر الزامی است"),
  zipCode: z.string().min(10, "کد پستی باید ۱۰ رقمی باشد"),
  street: z.string().min(1, "خیابان الزامی است"),
  alley: z.string().min(1, "کوچه الزامی است"),
  plaque: z.string().min(1, "پلاک الزامی است"),
  unit: z.string().min(1, "واحد الزامی است"),
});

type AddressFormInputs = z.infer<typeof addressSchema>;

const CreateAddressForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const router = useRouter();

  const [addAddress] = useMutation(ADD_ADDRESS, {
    onCompleted: () => {
      toast.success("ادرس با موفقیت اضافه شد");
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressSchema),
  });

  const onFormSubmit = (data: AddressFormInputs) => {
    addAddress({
      variables: {
        province: data.province,
        city: data.city,
        zipCode: data.zipCode,
        street: data.street,
        alley: data.alley,
        plaque: data.plaque,
        unit: data.unit,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label="استان"
        id="province"
        type="text"
        errorMessage={errors.province?.message}
        {...register("province")}
        size={40}
        fullWidth
      />

      <Input
        label="شهر"
        id="city"
        type="text"
        errorMessage={errors.city?.message}
        {...register("city")}
        size={40}
        fullWidth
      />

      <Input
        label="کد پستی"
        id="zipCode"
        type="text"
        errorMessage={errors.zipCode?.message}
        {...register("zipCode")}
        size={40}
        fullWidth
      />

      <Input
        label="خیابان"
        id="street"
        type="text"
        errorMessage={errors.street?.message}
        {...register("street")}
        size={40}
        fullWidth
      />

      <Input
        label="کوچه"
        id="alley"
        type="text"
        errorMessage={errors.alley?.message}
        {...register("alley")}
        size={40}
        fullWidth
      />

      <Input
        label="پلاک"
        id="plaque"
        type="text"
        errorMessage={errors.plaque?.message}
        {...register("plaque")}
        size={40}
        fullWidth
      />

      <Input
        label="واحد"
        id="unit"
        type="text"
        errorMessage={errors.unit?.message}
        {...register("unit")}
        size={40}
        fullWidth
      />

      <div className="flex justify-end pt-4">
        <Button type="submit">ثبت آدرس</Button>
      </div>
    </form>
  );
};

export default CreateAddressForm;
