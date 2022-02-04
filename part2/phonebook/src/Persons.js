import backEndLogic from "./backEndLogic";

const Persons = ({ contacts, stateChanger }) => {
  return (
    <div>
      {contacts.map((e) => (
        <div key={e.id}>
          {e.name} {e.number}{" "}
          <button
            type="submit"
            onClick={(event) => {
              // event.preventDefault();
              backEndLogic.deleteContact(e.id);
              stateChanger();
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
