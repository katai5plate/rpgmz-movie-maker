export default {
  sheetsById: {
    レイヤー: {
      staticOverrides: {
        byObject: {
          名刺: {
            pos: {
              y: 188,
              x: 542,
            },
            angle: -7,
            origin: "s",
          },
          ボタン3: {
            tint: {
              r: 1,
              g: 1,
              b: 1,
              a: 0.53,
            },
          },
        },
      },
      sequence: {
        subUnitsPerUnit: 30,
        length: 10,
        type: "PositionalSequence",
        tracksByObject: {
          名刺: {
            trackData: {
              z85FF0s4Gh: {
                type: "BasicKeyframedTrack",
                __debugName: '名刺:["angle"]',
                keyframes: [
                  {
                    id: "BDSS81Y0dL",
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: 388,
                  },
                  {
                    id: "P7mL5mM00X",
                    position: 1.467,
                    connectedRight: true,
                    handles: [0.11656441717791415, 0.8637777777777778, 0.5, 0],
                    type: "bezier",
                    value: -14.278243555555562,
                  },
                ],
              },
              vT4IDuGOKL: {
                type: "BasicKeyframedTrack",
                __debugName: '名刺:["pos","x"]',
                keyframes: [
                  {
                    id: "pDtCgSUmkO",
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: 1034,
                  },
                  {
                    id: "jUlELruhrq",
                    position: 1.467,
                    connectedRight: true,
                    handles: [0, 1.08, 0.5, 0],
                    type: "bezier",
                    value: 569,
                  },
                ],
              },
            },
            trackIdByPropPath: {
              '["angle"]': "z85FF0s4Gh",
              '["pos","x"]': "vT4IDuGOKL",
            },
          },
          文章窓: {
            trackData: {
              IyfmbANeya: {
                type: "BasicKeyframedTrack",
                __debugName: '文章窓:["scale","ofs","x"]',
                keyframes: [
                  {
                    id: "EhMYi7KxkY",
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: 0,
                  },
                ],
              },
              R7FwRPKMgS: {
                type: "BasicKeyframedTrack",
                __debugName: '文章窓:["scale","ofs","y"]',
                keyframes: [],
              },
              POq1Rbj6V4: {
                type: "BasicKeyframedTrack",
                __debugName: '文章窓:["scale","xy"]',
                keyframes: [
                  {
                    id: "vNDJbEZ5Wq",
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: 0,
                  },
                  {
                    id: "08w2s9JnAz",
                    position: 0.433,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: 1,
                  },
                ],
              },
            },
            trackIdByPropPath: {
              '["scale","ofs","x"]': "IyfmbANeya",
              '["scale","ofs","y"]': "R7FwRPKMgS",
              '["scale","xy"]': "POq1Rbj6V4",
            },
          },
          ボタン1: {
            trackData: {
              xhn4agpu2T: {
                type: "BasicKeyframedTrack",
                __debugName: 'ボタン1:["tint"]',
                keyframes: [
                  {
                    id: "q4cofyx5Sh",
                    position: 0,
                    connectedRight: true,
                    handles: [0.5, 1, 0.5, 0],
                    type: "bezier",
                    value: {
                      r: 0.9882352941176471,
                      g: 0.9411764705882353,
                      b: 0,
                      a: 1,
                    },
                  },
                ],
              },
            },
            trackIdByPropPath: {
              '["tint"]': "xhn4agpu2T",
            },
          },
        },
      },
    },
  },
  definitionVersion: "0.4.0",
  revisionHistory: ["yDNhHSHp2qYJjYDC"],
};
