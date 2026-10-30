import { replaceNullWithPlaceholder } from "@/lib/utils";

export const getAddressColumns = () => [
  {
    key: "name",
    header: "Name",
    render: (address: any) => (
      <span>
        {address?.first_name} {address?.last_name}
      </span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (address: any) => replaceNullWithPlaceholder(address?.phone_number),
  },
  {
    key: "address",
    header: "Address",
    className: "whitespace-normal",
    render: (address: any) => (
      <div>
        <div>{address.address_line_1}</div>
        {address.address_line_2 && (
          <div className="text-gray-500 text-[12px]">
            {address.address_line_2}
          </div>
        )}
        <div className="text-gray-500 text-[12px]">
          {[address.city, address.state, address.country]
            .filter(Boolean)
            .join(", ")}
        </div>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    render: (address: any) => replaceNullWithPlaceholder(address?.address_type),
  },
];
