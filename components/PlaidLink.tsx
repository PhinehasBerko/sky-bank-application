import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { StyledString } from 'next/dist/build/swc/types'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/Actions/user.actions'


const PlaidLink = ({user,variant}:PlaidLinkProps) => {
    const [token, setToken] =useState('') 
    const router  = useRouter()
    useEffect(()=>{
        const getLinkToken = async() =>{
            const data = await createLinkToken(user)
            setToken(data?.linkToken)
        }
        getLinkToken();
    },[])
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string) =>{
    await exchangePublicToken({
        publicToken:public_token,
        user,
    })
    router.push('/')
  },[router, user])

  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const {open, ready} = usePlaidLink(config)
    return (
    <>
        { variant ==='primary'?
        (<Button 
         className='plaidlink-primary'
         onClick={() => open()}
         disabled ={!ready}
        >
            Connect bank
        </Button>)
        : variant ==='ghost'?(
            <Button>
                Connect bank
            </Button>
        ): (
            <Button>
                Connect bank
            </Button>
        )
        }
    </>
  )
}

export default PlaidLink