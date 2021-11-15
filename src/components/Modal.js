import React, {Component} from 'react';
import s from './Modal.module.css';

const INITIAL_STATE = {
    validLetter: true,
    validNum: true,
    validEmptyLet: true,
    validEmptyNum: true,
    validNumLength: true
};

class Modal extends Component {

    state = { 
      changeNameInModal: '',
      changeNumberInModal: '',
      ...INITIAL_STATE
    };

    componentDidMount() {
        document.addEventListener("click", this.handleOutFocus);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleOutFocus);
    }

    handleOutFocus = () => {
        const {changeNameInModal, changeNumberInModal} = this.state;
        if (changeNameInModal !== '') {this.handleValidName()};
        if (changeNumberInModal !== '') {this.handleValidNumber()}
    }

    handleChangeInModal = ({target}) => {
        const {name, value} = target;
        this.setState({ 
            [name]: value,
            ...INITIAL_STATE
        })
        if (value === "") {
            this.setState({ 
                [name]: '',
                ...INITIAL_STATE
            })
        }
    };

    handleValidName = () => {
        const {changeNameInModal, validLetter} = this.state;
        const patternA = /\d+/;
        if(changeNameInModal.match(patternA)) {
            this.setState({ 
                validLetter: false
            })
        } else {
            this.setState({ 
                validLetter: true
            })
        };
    }

    handleValidNumber = () => {
        const {changeNumberInModal, validNum, validNumLength} = this.state;
        const pattern1 = /\d{12}/;
        const pattern2 = /\D/;
        if(!changeNumberInModal.match(pattern1)) {
            if (changeNumberInModal.match(pattern2)) {
               return this.setState({ 
                    validNum: false
                })
             } else {
                return this.setState({ 
                    validNumLength: false
                })
            }
        } else  {
            this.setState({
                validNum: true,
                validNumLength: true
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {changeNumberInModal, changeNameInModal, validLetter,  validNum, validNumLength} = this.state;
        if(changeNameInModal === '') {
            this.setState({
                validEmptyLet: false,
                validLetter: true
            });
        };
        this.handleValidName();
        validLetter && this.setState({changeNameInModal: ''});
        if(changeNumberInModal === '') {
            this.setState({ 
                validEmptyNum: false,
                validNum: true,
                validNumLength: true
            });
            return;
        };
        this.handleValidNumber();
        if (validNum && validNumLength) {this.setState({changeNumberInModal: ''})};
        if(validLetter &&  validNum && validNumLength) console.log(changeNameInModal, changeNumberInModal)
    }
    
    render () {
        const {changeNameInModal, changeNumberInModal, validLetter, validNum, validEmptyLet, validEmptyNum, validNumLength} = this.state;
        const {name, category, price, closeModal} = this.props;
        return (
            <div className={s.backdrop}>
                <div className={s.modalWindow}>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <img className={s.btnClose} src="../../media/285.png"
                            alt='' onClick={() => closeModal()} />
                        <label className={s.elements}>
                            <span className={s.typeOfGood}>{category}</span>
                            <span className={s.nameOfGood}>{name}</span>
                            <span className={s.digitOfPrice}>{price}</span>
                            <div className={s.letterBlock}>
                                <input
                                    type="text"
                                    className={validLetter && validEmptyLet ? s.el : s.errNum}
                                    name='changeNameInModal'
                                    value={changeNameInModal}
                                    onChange={this.handleChangeInModal}
                                    placeholder="Name"
                                />
                                {!validLetter ? <span className={s.helpText}>Only letters allowed</span> : 
                                 !validEmptyLet ? <span className={s.helpText}>This field is required</span> : ''}
                            </div>
                            <div className={s.numberBlock}>
                                <input
                                    type="text"
                                    className={validNum && validEmptyNum && validNumLength ? s.el : s.errNum}
                                    name='changeNumberInModal'
                                    value={changeNumberInModal}
                                    onChange={this.handleChangeInModal} 
                                    placeholder="Phone"
                                    maxLength="12"
                                />
                                {!validNum ? <span className={s.helpText}>Only numbers allowed</span> : 
                                 !validEmptyNum ? <span className={s.helpText}>This field is required</span> : 
                                 !validNumLength ? <span className={s.helpText}>Should contain 12 characters</span> : ''}
                            </div>
                            <button className={s.btn} type="submit">Order</button>
                        </label>
                    </form>
                 </div>
            </div>
        )
    }
}


export default Modal
