// import { useUpdateUserMutation } from '@/lib/services/api/usersApi/usersApi';
// import { useState } from 'react';
// import { UserFormValues } from '@/components/users/types';

// export function useUpdateUser(userId: string) {

//   const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
//   const [apiError, setApiError] = useState<number | null>(null);

//   const updateUser = async (values: UserFormValues) => {
//     setApiError(null);

//     try {
//       const payload = {
//         name: values.name,
//         lastName: values.lastName,
//         typeOfIdentificationDocument: values.typeOfIdentificationDocument,
//         identificationDocument: values.identificationDocument,
//         email: values.email,
//         role: values.roleId, // 🔑 AQUÍ ESTÁ LA CLAVE
//         ...(values.password ? { password: values.password } : {}),
//       };

//       await updateUserMutation({
//         id: Number(userId),
//         ...payload,
//       }).unwrap();
//     } catch (error: any) {
//       setApiError(error?.status ?? 500);
//     }
//   };

//   return {
//     updateUser,
//     isLoading,
//     apiError,
//   };
// }
