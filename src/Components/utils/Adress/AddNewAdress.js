const AddNewAdress = () => {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box p={2} role="presentation" className="adress-enter-drawer-box">
        <div className="content-inside-drawer-add">
          <span className="edit-profile-drawer-heading">
            Add New Delivery Adress
          </span>
          {deliveryErrorfromBackend && (
            <Alert severity="error">{deliveryErrorfromBackend}</Alert>
          )}
          {deliverySucess && (
            <Alert severity="success">Deliver Adress Added!</Alert>
          )}
          <form onSubmit={addNewDeliveryAdress} className="add-delivery-adress">
            <TextField
              id="outlined-basic"
              label="Enter Name For Adress 
          "
              variant="standard"
              helperText="Home, Work, etc"
              fullWidth
              sx={{ mt: 2, mb: 3 }}
              required
              onChange={(e) => {
                setAdressName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Adress 
          "
              variant="standard"
              helperText="Flat, Housing no., Building, Apartment, Area, street, sector"
              fullWidth
              sx={{ mt: 2, mb: 3 }}
              required
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Pincode
          "
              type="number"
              variant="standard"
              helperText="Please Enter your pincode"
              fullWidth
              sx={{ mt: 2, mb: 3 }}
              required
              onChange={(e) => {
                setpostalCode(e.target.value);
                handlePostalCode(e.target.value);
              }}
            />
            {loadingPincode ? (
              <Loader />
            ) : (
              <>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-basic"
                  variant="standard"
                  label="City"
                  helperText="Please Enter your pincode"
                  fullWidth
                  sx={{ mt: 2, mb: 3 }}
                  required
                  disabled
                  value={city}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-basic"
                  variant="standard"
                  label="State"
                  helperText="Please Enter your pincode"
                  fullWidth
                  sx={{ mt: 2, mb: 3 }}
                  required
                  disabled
                  value={state}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  id="outlined-basic"
                  variant="standard"
                  label="Country"
                  helperText="Please Enter your pincode"
                  fullWidth
                  sx={{ mt: 2, mb: 3 }}
                  required
                  disabled
                  value={country}
                />
                <Button
                  style={{
                    backgroundColor: "#FA9B3D",
                    fontFamily: "Poppins",
                  }}
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Add Adress
                </Button>
              </>
            )}
          </form>
        </div>
      </Box>
    </Drawer>
  );
};

export default AddNewAdress;
