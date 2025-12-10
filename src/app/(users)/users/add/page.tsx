'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';

export default function Page() {
  const { data: rolesData, isSuccess } = useGetAllRolesQuery();
  console.log(rolesData);

  return (
    <div className="mt-6">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            {isSuccess &&
              rolesData?.data?.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <pre>{JSON.stringify(rolesData, null, 2)}</pre>
    </div>
  );
}
