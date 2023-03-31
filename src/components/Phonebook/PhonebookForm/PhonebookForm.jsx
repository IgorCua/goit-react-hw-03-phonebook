import { Component } from "react";
import style from "./PhonebookForm.module.css";

export class PhonebookForm extends Component {
    // console.log("PhonebookForm");
    shouldComponentUpdate(nextProps, nextState) {
        const curStateStr = JSON.stringify(this.state)
        const nextStateStr = JSON.stringify(nextState);
        
        if(curStateStr !== nextStateStr) return true;
        return false;
    }
    render() {
        const handleSubmit = this.props.handleSubmit;
        // console.log("Form")

        return <form action="" onSubmit={handleSubmit} className={style.form}>
            <label htmlFor="name" className={style.nameLabel}>Name</label>
            <input
                id="name"
                className={style.nameInput}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />

            <label className={style.numberLabel} htmlFor="number">Number</label>
            <input
                className={style.numberInput}
                id="number"
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />

            <button type="submit" className={style.submit}>Add contact</button>
        </form>
    }
}