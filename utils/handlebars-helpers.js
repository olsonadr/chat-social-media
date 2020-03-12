module.exports = {

  headerDropdownModeCheck:  function(mode, required) {
                                return (required == 'any') || (mode == required);
                            }

};
