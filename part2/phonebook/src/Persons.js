const Persons = ({ contacts, deleteHandler }) => {
  return (
    <div>
      {contacts.map((e) => (
        <div key={e.id}>
          {e.name} {e.number}{" "}
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              deleteHandler(e.id, e.name);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Persons;
