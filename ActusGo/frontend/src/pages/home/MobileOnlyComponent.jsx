import React from 'react'

function MobileOnlyComponent(props) {
    const styles = {
        createIcon: {
          position: "fixed",
          bottom: "70px",
          right: "15px",
          backgroundColor: "#efff55",
          color: "#fff",
          borderRadius: "50%",
          padding: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 999, // Ensure the icon is above other elements
        },
      };

const setVisible = props.setVisible;

  return (
    <div

    style={styles.createIcon}
    onClick={() => setVisible(true)}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='#000000'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polygon points='16 3 21 8 8 21 3 21 3 16 16 3' />
    </svg>
  </div>
  )
}

export default MobileOnlyComponent