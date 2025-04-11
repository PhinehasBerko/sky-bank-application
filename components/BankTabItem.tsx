import React from 'react'
import {cn, formUrlQuery} from "@lib/utils"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';
const BankTabItem = ({account, appwriteItemId}: BankTabItemProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isActive = appwriteItemId === account?.appwriteItemId;

    const handleBankChange =() =>{
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "id",
            value: account?.appwriteItemId
        })
        router.push(newUrl, {scroll: false})
    }
  return (
    <div 
      onClick={handleBankChange}
      className={cn(`banktab-item`,{"border-blue-600":isActive})}
    >
        <p 
         className={cn(`text-16 link-clamp-1 flex-1 font-medium text-gray-500`,{"text-blue-600":isActive})}>
            {account.name}
         </p>
    </div>
  )
}

export default BankTabItem