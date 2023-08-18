export const sessionController = {
  showSession: async function (req, res) {
    try {
      // agregar un DTOUserResponse para que no enviee informacion sensible al front
      return res.status(200).json({
        status: 'succes',
        msg: 'datos de la session',
        payload: req.session.user || {},
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong',
        data: { error },
      });
    }
  },
};
