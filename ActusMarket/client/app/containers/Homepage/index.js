/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

const routes = {
  banner1: '/route1',
  banner2: '/route2',
  banner3: '/route3',
  banner4: '/route4',
  banner5: '/route5',
  banner6: '/route6'
};

class Homepage extends React.PureComponent {
  render() {
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}>
                {banners.map((item, index) => (
                  <a key={index} href={routes[`banner${index + 1}`]}>
                    <img className='rounded' src={item.imageUrl} />
                  </a>
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <a href={routes.banner1}>
                <img
                  src='/images/banners/banner-2.jpg'
                  className='mb-3 rounded'
                />
              </a>
              <a href={routes.banner2}>
                <img className='rounded' src='/images/banners/banner-5.jpg' />
              </a>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <a href={routes.banner3}>
                <img
                  src='/images/banners/banner-2.jpg'
                  className='mb-3 rounded'
                />
              </a>
              <a href={routes.banner4}>
                <img className='rounded' src='/images/banners/banner-6.jpg' />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
