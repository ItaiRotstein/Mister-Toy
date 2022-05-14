import React from "react";

import { setUserMsg } from '../store/actions/toy.action';
import { connect } from "react-redux";

class _UserMsg extends React.Component {

    componentDidUpdate() {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
            this.onCloseMsg()
        }, 3000)
    }

    onCloseMsg = () => {
        this.props.setUserMsg(null)
    }

    render() {
        const { msg } = this.props
        if (!msg) return <span></span>
        const msgClass = msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                <button onClick={this.onCloseMsg}>x</button>
                {msg.txt}
            </section>
        )
    }
}

function mapStateToProps( storeState ){
    return {
        // msg: toyModule.msg
        msg: storeState.toyModule.msg
    }
}

const mapDispatchToProps = {
    setUserMsg
}

export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)