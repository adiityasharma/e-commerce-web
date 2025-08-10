import ShoppingProductTile from '@/components/shopping/ProductTile'
import { Input } from '@/components/ui/input'
import { getSearchResult } from '@/features/shop/searchSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const SearchProducts = () => {

  const [keyword, setKeyword] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResult } = useSelector(state => state.shopSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    }
  }, [keyword]);
  

  return (
    <div className='container mx-auto md:px-6 px-5 py-8 '>
      <div className='flex justify-center mb-8 lg:px-10'>
        <div className='w-full flex items-center'>
          <Input
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            className="px-6 py-6"
            placeholder="Search products..."
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:px-10'>
        {
          searchResult && searchResult.length ? searchResult.map((item) => (
            <ShoppingProductTile product={item} />
          )): <h1 className='text-4xl font-bold'>No Result Found</h1>
        }
      </div>
    </div>
  )
}

export default SearchProducts
