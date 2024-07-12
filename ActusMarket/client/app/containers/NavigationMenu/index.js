/**
 *
 * NavigationMenu
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

class NavigationMenu extends React.PureComponent {
  render() {
    const { isMenuOpen, categories, toggleMenu } = this.props;

    const handleCategoryClick = () => {
      this.props.toggleMenu();
    };

    return (
      <div className='navigation-menu'>
        <div className='menu-header'>
          {isMenuOpen && (
            <Button
              className='close_menubtn'
              borderless
              variant='empty'
              ariaLabel='close the menu'
              icon={<CloseIcon />}
              onClick={toggleMenu}
            />
          )}

          <div className='logo_Area'>
            <div className='logo_style_full'>
              <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 1662 742.9'
                style={{ enableBackground: 'new 0 0 1662 742.9' }}
                xmlSpace='preserve'>
                <style
                  type='text/css'
                  dangerouslySetInnerHTML={{
                    __html:
                      '\n\t.st0{fill:#0C0C0C;}\n\t.st1{fill:#FFFFFF;}\n\t.st2{fill:url(#SVGID_1_);}\n\t.st3{opacity:0.14;fill:#FFFFFF;enable-background:new    ;}\n'
                  }}
                />
                <g>
                  <g>
                    <path
                      className='st1'
                      d='M1247.9,324.8c0-45.4,25.7-84.8,63.4-104.3c-3.7-2.5-7.6-4.6-11.6-6.4c-9.8-4.4-20.5-6.7-31.4-6.7h-43.4v27.1
			c-9.5-18-28.5-29.6-54.9-29.6c-45.8,0-82,37.7-82,101.7s36.3,101.7,82,101.7c26.4,0,45.4-11.6,54.9-29.6v23.6
			c0,27.8-13.4,33.4-29.2,33.4c-14.4,0-23.2-5.3-25.3-15.5h-76.7c5.3,50.3,42.9,83.1,107.7,83.1c61.7,0,90.8-33.5,98.9-74.9
			l-20.7-23.6C1259.9,384,1247.9,355.8,1247.9,324.8z M1191.2,356c-14.1,0-25.7-10.6-25.7-34.1c0-23.6,12-34.2,25.7-34.2
			s25.7,10.6,25.7,34.2C1216.9,345.5,1205,356,1191.2,356z'
                    />
                    <g>
                      <linearGradient
                        id='SVGID_1_'
                        gradientUnits='userSpaceOnUse'
                        x1='1365.55'
                        y1='2594.1001'
                        x2='1365.55'
                        y2='2298.3999'
                        gradientTransform='matrix(1 0 0 -1 0 2801.3999)'>
                        <stop
                          offset='0.2967'
                          style={{ stopColor: '#EFFF55' }}
                        />
                        <stop
                          offset='0.3985'
                          style={{ stopColor: '#D8E172' }}
                        />
                        <stop offset='0.752' style={{ stopColor: '#8C7ED5' }} />
                        <stop
                          offset='0.9105'
                          style={{ stopColor: '#6E56FC' }}
                        />
                      </linearGradient>
                      <path
                        className='st2'
                        d='M1365.5,207.3c-64.9,0-117.5,52.6-117.5,117.5c0,31,12,59.1,31.5,80.1l86,98.1l86-98.1
				c19.6-21,31.6-49.2,31.6-80.1C1483,259.9,1430.4,207.3,1365.5,207.3z M1367,362c-17.1,0-31-18.4-31-41s13.9-41,31-41
				s31,18.4,31,41S1384.1,362,1367,362z'
                      />
                      <path
                        className='st1'
                        d='M1365.4,220.2c-59.8,0-104.8,38.4-104.8,101.7s45,101.7,104.8,101.7s104.9-38.4,104.9-101.7
				C1470.3,258.5,1425.3,220.2,1365.4,220.2z M1365.4,356c-14.1,0-25.7-10.6-25.7-34.1c0-23.6,12-34.2,25.7-34.2
				s25.7,10.6,25.7,34.2S1379.2,356,1365.4,356z'
                      />
                    </g>
                    <ellipse
                      className='st3'
                      cx='1364.9'
                      cy='522.4'
                      rx='42.6'
                      ry='3.7'
                    />
                  </g>
                  <g>
                    <path
                      className='st1'
                      d='M215,256.2c33.1,0,55.8,15.6,67.9,31.6v-28.4h40.9v195.8h-40.9v-29.1c-12.4,16.7-35.9,32.3-68.6,32.3
			c-50.8,0-91.7-41.6-91.7-102C122.6,296,163.5,256.2,215,256.2z M223.5,291.4c-30.2,0-59.3,22.7-59.3,65s29.1,66.8,59.3,66.8
			c30.6,0,59.3-23.8,59.3-66.1C282.9,315.2,254.1,291.4,223.5,291.4z'
                    />
                    <path
                      className='st1'
                      d='M441.2,256.2c48,0,79.2,23.8,90.3,65h-43.7c-6.8-18.8-22.4-30.9-46.5-30.9c-32.7,0-54.4,24.2-54.4,66.8
			c0,43,21.7,67.2,54.4,67.2c24.2,0,39.1-10.7,46.5-30.9h43.7c-11,38.4-42.3,65-90.3,65c-56.1,0-95.9-39.8-95.9-101.3
			C345.2,296,385,256.2,441.2,256.2z'
                    />
                    <path
                      className='st1'
                      d='M560,292.4h-23.1v-33H560v-48.7h40.9v48.7h47.6v33h-47.6v108.4c0,14.6,5.7,20.6,22.7,20.6h24.9v33.8h-32
			c-34.8,0-56.5-14.6-56.5-54.4L560,292.4L560,292.4z'
                    />
                    <path
                      className='st1'
                      d='M844.8,455.2h-40.5v-23.5c-12.8,16.7-34.8,26.3-57.9,26.3c-45.8,0-80.7-28.8-80.7-83.5V259.4h40.2v109.1
			c0,35.9,19.5,54.4,49,54.4c29.8,0,49.4-18.5,49.4-54.4V259.4h40.5V455.2z'
                    />
                    <path
                      className='st1'
                      d='M950.9,458.4c-46.9,0-80-27.7-81.7-63.2h41.9c1.4,16,16.7,29.1,39.1,29.1c23.5,0,35.9-10,35.9-23.5
			c0-38.4-113.7-16.4-113.7-88.1c0-31.3,29.1-56.5,75.3-56.5c44.4,0,73.6,23.8,75.7,62.9h-40.5c-1.4-17.1-14.6-28.8-36.6-28.8
			c-21.7,0-33,8.9-33,22c0,39.4,110.5,17.4,112.6,88.1C1025.8,433.5,997.1,458.4,950.9,458.4z'
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className='menu-body'>
          <Container>
            <h3 className='menu-title'>Navigate</h3>
            <nav role='navigation'>
              <ul className='menu-list'>
                {categories.map((link, index) => (
                  <li key={index} className='menu-item'>
                    <NavLink
                      onClick={handleCategoryClick}
                      to={'/shop/category/' + link.slug}
                      activeClassName='active-link'
                      exact>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>

          <Container>
            <h3 className='menu-title'>Shop By Category</h3>
            <nav role='navigation'>
              <ul className='menu-list'>
                {categories.map((link, index) => (
                  <li key={index} className='menu-item'>
                    <NavLink
                      onClick={handleCategoryClick}
                      to={'/shop/category/' + link.slug}
                      activeClassName='active-link'
                      exact>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.category.storeCategories
  };
};

export default connect(mapStateToProps, actions)(NavigationMenu);
