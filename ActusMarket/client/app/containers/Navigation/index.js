import React from 'react';

import { connect } from 'react-redux';
import { Link, NavLink as ActiveLink, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import CartIcon from '../../components/Common/CartIcon';
import { BarsIcon } from '../../components/Common/Icon';
import MiniBrand from '../../components/Store//MiniBrand';
import Menu from '../NavigationMenu';
import Cart from '../Cart';

class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands();
    this.props.fetchStoreCategories();
  }

  toggleBrand() {
    this.props.fetchStoreBrands();
    this.props.toggleBrand();
  }

  toggleMenu() {
    this.props.fetchStoreCategories();
    this.props.toggleMenu();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? 'react-autosuggest__suggestion-match'
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className='d-flex'>
          <img
            className='item-image'
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className='name'>{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='price'>${suggestion.price}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      categories,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested
    } = this.props;

    const inputProps = {
      placeholder: 'Search Products',
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      }
    };

    return (
      <header className='header fixed-mobile-header'>
        <Container>
          <Row className='align-items-center top-header'>
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 3, order: 1 }}
              className='pr-0'>
              <div className='brand'>
                {categories && categories.length > 0 && (
                  <Button
                    borderless
                    variant='empty'
                    className='d-none d-md-block'
                    ariaLabel='open the menu'
                    icon={<BarsIcon />}
                    onClick={() => this.toggleMenu()}
                  />
                )}
                <Button
                  borderless
                  variant='empty'
                  ariaLabel='open the menu'
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <Link to='/' className='logo_flex'>
                  <div className='logo_style'>
                    <svg
                      version='1.1'
                      id='Layer_1'
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      x='0px'
                      y='0px'
                      viewBox='0 0 706.7 592.3'
                      style={{ enableBackground: 'new 0 0 706.7 592.3' }}
                      xmlSpace='preserve'>
                      <style
                        type='text/css'
                        dangerouslySetInnerHTML={{
                          __html:
                            '\n\t.st0{fill:#0C0C0C;}\n\t.st1{fill:#FFFFFF;}\n\t.st2{fill:url(#SVGID_1_);}\n\t.st3{opacity:0.14;fill:#FFFFFF;enable-background:new    ;}\n'
                        }}
                      />
                      <g>
                        <path
                          className='st1'
                          d='M315.2,277.6c0-45.4,25.7-84.7,63.4-104.3c-3.7-2.5-7.6-4.6-11.6-6.4c-9.8-4.4-20.5-6.7-31.4-6.7h-43.4v27.1
		c-9.5-18-28.5-29.6-54.9-29.6c-45.8,0-82,37.6-82,101.7s36.3,101.7,82,101.7c26.4,0,45.4-11.6,54.9-29.6v23.6
		c0,27.8-13.4,33.4-29.2,33.4c-14.4,0-23.2-5.3-25.3-15.5H161c5.3,50.3,42.9,83.1,107.7,83.1c61.7,0,90.8-33.5,98.9-74.9l-20.9-23.5
		C327.1,336.7,315.2,308.5,315.2,277.6z M258.5,308.8c-14.1,0-25.7-10.6-25.7-34.1c0-23.6,12-34.2,25.7-34.2s25.7,10.6,25.7,34.2
		C284.2,298.2,272.2,308.8,258.5,308.8z'
                        />
                        <g>
                          <linearGradient
                            id='SVGID_1_'
                            gradientUnits='userSpaceOnUse'
                            x1='432.6808'
                            y1='1033.8149'
                            x2='432.6808'
                            y2='738.1149'
                            gradientTransform='matrix(1 0 0 -1 0 1193.8298)'>
                            <stop
                              offset='0.2967'
                              style={{ stopColor: '#EFFF55' }}
                            />
                            <stop
                              offset='0.3985'
                              style={{ stopColor: '#D8E172' }}
                            />
                            <stop
                              offset='0.752'
                              style={{ stopColor: '#8C7ED5' }}
                            />
                            <stop
                              offset='0.9105'
                              style={{ stopColor: '#6E56FC' }}
                            />
                          </linearGradient>
                          <path
                            className='st2'
                            d='M432.7,160c-64.9,0-117.5,52.6-117.5,117.5c0,31,12,59.1,31.5,80.1l86,98.1l86-98.1
			c19.6-21,31.5-49.2,31.5-80.1C550.2,212.6,497.6,160,432.7,160z M434.2,314.7c-17.1,0-31-18.4-31-41s13.9-41,31-41s31,18.4,31,41
			S451.4,314.7,434.2,314.7z'
                          />
                          <path
                            className='st1'
                            d='M432.7,172.9c-59.8,0-104.8,38.3-104.8,101.7c0,63.3,45,101.7,104.8,101.7s104.9-38.4,104.9-101.7
			C537.5,211.3,492.5,172.9,432.7,172.9z M432.7,308.8c-14.1,0-25.7-10.6-25.7-34.1c0-23.6,12-34.2,25.7-34.2s25.7,10.6,25.7,34.2
			C458.4,298.2,446.4,308.8,432.7,308.8z'
                          />
                        </g>
                        <ellipse
                          className='st3'
                          cx='432.1'
                          cy='475.1'
                          rx='42.6'
                          ry='3.7'
                        />
                      </g>
                    </svg>
                  </div>
                  <h1 className='logo '>DealsHub</h1>
                </Link>

                <CartIcon
                  className='card_mobile '
                  cartItems={cartItems}
                  onClick={toggleCart}
                />
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 5, order: 2 }}
              className='pt-2 pt-lg-0'>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                  history.push(`/product/${item.suggestion.slug}`);
                }}
              />
            </Col>

            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 4, order: 3 }}
              // className='px-0'
            >
              <Navbar color='light' light expand='md' className='mt-1 mt-md-0'>
                <Nav navbar>
                  {brands && brands.length > 0 && (
                    <Dropdown
                      nav
                      inNavbar
                      toggle={() => this.toggleBrand()}
                      isOpen={isBrandOpen}>
                      <DropdownToggle nav>
                        Brands
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right className='nav-brand-dropdown'>
                        <div className='mini-brand'>
                          <MiniBrand
                            brands={brands}
                            toggleBrand={() => this.toggleBrand()}
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to='/shop'
                      activeClassName='active'>
                      Explore
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {user.firstName ? user.firstName : 'Welcome'}
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push('/dashboard')}>
                          Dashboard
                        </DropdownItem>
                        <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        Welcome!
                        <span className='fa fa-chevron-down dropdown-caret'></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => history.push('/login')}>
                          Login
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push('/register')}>
                          Sign Up
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Nav>
                <div className='card_bigscreen'>
                  <CartIcon
                    className='d-none d-md-block'
                    cartItems={cartItems}
                    onClick={toggleCart}
                  />
                </div>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* hidden cart drawer */}
        <div
          className={isCartOpen ? 'mini-cart-open' : 'hidden-mini-cart'}
          aria-hidden={`${isCartOpen ? false : true}`}>
          <div className='mini-cart'>
            <Cart />
          </div>
          <div
            className={
              isCartOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? 'mini-menu-open' : 'hidden-mini-menu'}
          aria-hidden={`${isMenuOpen ? false : true}`}>
          <div className='mini-menu'>
            <Menu />
          </div>
          <div
            className={
              isMenuOpen ? 'drawer-backdrop dark-overflow' : 'drawer-backdrop'
            }
            onClick={toggleMenu}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    categories: state.category.storeCategories,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
