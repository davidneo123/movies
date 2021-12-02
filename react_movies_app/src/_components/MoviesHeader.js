import React, {useState} from 'react';

export const MoviesHeader = props =>{
    const [keyword, setKeyword] = useState('');

return(<div>
<form onSubmit={props.getMovies.bind(this,keyword)}>
        <label>
          Search by Keyword:{keyword}
          <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} />
        </label>
        <input type="submit" value="Retrieve" />
      </form>
</div>)
}