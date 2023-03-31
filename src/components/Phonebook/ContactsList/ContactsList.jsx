import style from "./ContactsList.module.css";

export const ContactsList = (props) => {
    const {searchByName, handleFilterChange, deleteFromContacts} = props;
    const filtered = searchByName();
    // console.log("Contactlist");
    return (
        <div className={style.contactsDiv}>
            <h2 className={style.title}>Contacts</h2>
            <label className={style.filterLabel} htmlFor="filter">Find contacts by name</label>
            <input className={style.filterInput} type="text" id="filter" onChange={handleFilterChange}/>
            
            <ul className={style.list}>
                {filtered.map(({id, name, number}) => {
                    return <li className={style.item} key={id} id={id}>
                        <p className={style.text}>{name}: {number}</p> 
                        <button className={style.button} type="button" onClick={deleteFromContacts}>Delete</button>       
                    </li>
                })}
            </ul>
        </div>
    )
}