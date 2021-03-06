import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'

import {
  //setPageSelection,
  setZerInBtcValue,
  setZerInCurrencyValue,
  setActiveType} from '../actions/Context'

import {
  setZMainPage,
  setTMainPage,
  setSendPage,
  setReceivePage,
  setPrivateKeyPage,
  setPassPhrasePage} from '../actions/MainSubPage'

import { MainGrid,
         UpperButtonSection,
         UpperSection,
         UpperSectionOpaque,
         LowerSection,
         LowerSectionOpaque,
         //LowerButtonSection,
         Menu,
         MenuTitle,
         MenuButton,
         MenuContent,
         MenuButtonLine} from '../components/main'

import { GreyButton } from '../components/button'

import ChainTApi from '../containers/chaintapi'
import TTransactionList from '../containers/ttransactionlist'

class TMain extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      menuOpen: 'none'
    }

    this.getZerPrice = this.getZerPrice.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

    closeMenu () {
      this.setState({menuOpen: 'none'})
    }

    toggleMenu () {
      if (this.state.menuOpen == 'none') {
        this.setState({menuOpen: 'block'})
      } else {
        this.setState({menuOpen: 'none'})
      }
    }

    getZerPrice() {
      // if (this.props.mainSubPage.tmainPage != 'none') {
      //   const cmcZerInfoURL = 'https://api.coinmarketcap.com/v1/ticker/zero/?convert=USD'
      //   axios.get(cmcZerInfoURL)
      //     .then((resp) => {
      //       try {
      //         const coinmarketcapData = resp.data
      //         const priceBtc = parseFloat(coinmarketcapData[0]['price_btc'])
      //         const priceCurrency = parseFloat(coinmarketcapData[0]['price_usd'])
      //
      //         this.props.setZerInBtcValue(priceBtc)
      //         this.props.setZerInCurrencyValue(priceCurrency)
      //       } catch (err) {
      //         if (process.env.NODE_ENV != 'production') {
      //           console.log(err)
      //         }
      //       }
      //   })
      // }
    }

    componentDidMount() {
      window.addEventListener("click", this.closeMenu)

      this.getZerPrice()
      this.PriceID = setInterval(
        () => this.getZerPrice(),
        30000
      )
    }

    componentWillUnmount() {
      clearInterval(this.PriceID)
    }


    render () {
      var screenDim = this.props.context.dimensions

      return (
        <MainGrid sc={screenDim} visible={this.props.mainSubPage.tmainPage}>

          <Menu sc={screenDim}>
            <MenuTitle sc={screenDim}>
              Skull Island
            </MenuTitle>
            <MenuButton sc={screenDim}
              onClick={ e => {
                e.stopPropagation()
                this.toggleMenu()}}>
              Menu
            </MenuButton>
            <MenuContent sc={screenDim} visible={this.state.menuOpen} size={3}>
              <MenuButtonLine sc={screenDim} pos={0}
              onClick={() => {
                this.props.setActiveType('Z')
                this.props.setTMainPage('none')
                this.props.setZMainPage('visible')
              }}
              >
              Toggle T/Z
              </MenuButtonLine>
              <MenuButtonLine sc={screenDim} pos={1}
              onClick={() => {
                this.props.setTMainPage('none')
                this.props.setPrivateKeyPage('visible')
              }}
              >
              Private Key(s)
              </MenuButtonLine>

              <MenuButtonLine sc={screenDim} pos={2}
              onClick={() => {
                this.props.setZMainPage('none')
                this.props.setPassPhrasePage('visible')
              }}
              >
              Show Passphrase
              </MenuButtonLine>

            </MenuContent>
          </Menu>

          <UpperSection sc={screenDim}>
          </UpperSection>
          <UpperSectionOpaque sc={screenDim}>
            <ChainTApi />
            <UpperButtonSection sc={screenDim}>
              <GreyButton sc={screenDim}
                onClick={() => {
                  this.props.setTMainPage('none')
                  this.props.setSendPage('visible')
                }}>
                Send
              </GreyButton>
              <GreyButton sc={screenDim}
                onClick={() => {
                  this.props.setTMainPage('none')
                  this.props.setReceivePage('visible')
                }}>
                Receive
              </GreyButton>
            </UpperButtonSection>
          </UpperSectionOpaque>

          <LowerSection sc={screenDim}>
          </LowerSection>
          <LowerSectionOpaque sc={screenDim}>
            <TTransactionList />
          </LowerSectionOpaque>

        </MainGrid>
      )
    }

  }


TMain.propTypes = {
  setZerInBtcValue: PropTypes.func.isRequired,
  setZerInCurrencyValue: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
  setTMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setActiveType: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setZerInBtcValue,
      setZerInCurrencyValue,
      setZMainPage,
      setTMainPage,
      setSendPage,
      setReceivePage,
      setPrivateKeyPage,
      setPassPhrasePage,
      setActiveType
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(TMain)
