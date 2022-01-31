const PersonForm = ({ name, number, nameHandler, numberHandler, adder }) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit" onClick={adder}>
          add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;
