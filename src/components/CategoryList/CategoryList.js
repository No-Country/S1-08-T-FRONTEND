import React, { useEffect, useState } from 'react'
import { useGetAllCategoriesQuery } from '../../app/services/categories';

function CategoryList() {

  const { data, error, isLoading, isSuccess, isError, refetch } = useGetAllCategoriesQuery();

  const [categories, setcategories] = useState([]);


  useEffect(() => {
    if (data) {
      setcategories(data);
    }
  }, [data]); // eslint-disable-line

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  return (
    <div>
      <div>CategoryList</div>

      <div>
        {isLoading && "cargando..."}

        {isError && error.message}

        {isSuccess &&
          categories &&
          categories.map((category) => (
            <div key={category.id}>
              {category.name}
            </div>
          ))}
      </div>
    </div>
  )

}

export default CategoryList
