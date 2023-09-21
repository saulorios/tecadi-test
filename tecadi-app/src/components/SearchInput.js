function SearchInput(props) {
    return (
      <div className="form-group mb-3">
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          className="form-control"
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          required={props.required}
        />
      </div>
    );
  }
  
  export default SearchInput;