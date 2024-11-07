import { createChart, PriceScaleMode } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import FullscreenToggle from "./FullScreenToggle";
const CHART_OPTIONS = {
  //  width: 360,
  //  height: 250,
  // autoSize: true,
  rightPriceScale: {
    visible: true,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
    mode: PriceScaleMode.Normal,
    borderColor: "rgba(197, 203, 206, 0.4)",
  },
  // priceFormat: {
  //   type: "custom",
  //   formatter: (price) => {
  //     if (price >= 1000) {
  //       return (price / 1000).toFixed(1) + "k";
  //     }
  //     return price.toFixed(2);
  //   },
  // },
  localization: {
    priceFormatter: (price) => {
      if (price >= 1000) {
        return (price / 1000).toFixed(1) + "k";
      }
      return price.toFixed(2);
    },
  },

  timeScale: { minBarSpacing: 0.00000001 },
  layout: {
    background: {
      type: "solid",
      color: "#000",
    },
    textColor: "#ffffff",
  },
  horzScaleOptions: {
    minBarSpacing: 0.00001,
    barSpacing: 0,
  },
  GridOptions: {
    visible: false,
  },
  // grid: {
  //   vertLines: {
  //     color: "rgba(197, 203, 206, 0.4)",
  //     style: LineStyle.Dotted,
  //   },
  //   horzLines: {
  //     color: "rgba(197, 203, 206, 0.4)",
  //     style: LineStyle.Dotted,
  //   },
  // },
};
const CHART_OPTIONS_WITHOUT_TIME = {
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.4)",
    tickMarkFormatter: (time) => {
      return time.toString();
    },
  },
  localization: {
    timeFormatter: (time) => {
      return time.toString();
    },
  },
};
export const ChartComponent = (props) => {
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);
  const initialSeries = useRef(null);
  const finalSeries = useRef(null);
  // const [receivedData, setReceivedData] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // Send message to React Native to toggle fullscreen
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("TOGGLE_FULLSCREEN");
    }
  };

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, CHART_OPTIONS);
    chartRef?.current?.applyOptions({
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });
    chartRef?.current?.timeScale().fitContent();
    chartRef?.current?.applyOptions({
      width: 380,
      height: 250,
    });

    document.addEventListener("webview-graphData", (e) => {
      // alert(
      //   "1init" +
      //     JSON.stringify(initialSeries.current + finalSeries.current) +
      //     "***return***"
      // );
      if (initialSeries.current) {
        initialSeries.current = null;
        // initialSeries.current.setData([]);
      }
      if (finalSeries.current) {
        finalSeries.current = null;
        // finalSeries.current.setData([]);
      }
      // alert(
      //   "2init" +
      //     JSON.stringify(initialSeries.current + finalSeries.current) +
      //     "***return***"
      // );
      if (e.data.data.showNumbersOnXAxis) {
        chartRef.current.applyOptions(CHART_OPTIONS_WITHOUT_TIME);
      }

      //  else {
      //   //   chartRef.current.timeScale().setVisibleRange({
      //   //     from: (new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))).getTime() / 1000,
      //   //     to: (new Date(Date.UTC(2024, 1, 1, 0, 0, 0, 0))).getTime() / 1000,
      //   // });
      // }
      if (e.data.data.returnsValue) {
        finalSeries.current = chartRef.current.addLineSeries({
          topColor: "rgba(67, 83, 254, 0.7)",
          bottomColor: "rgba(67, 83, 254, 0.8)",
          color: "rgba(67, 83, 254, 1)", //lineColor for AreaSeries
          lineWidth: 2,
        });
        finalSeries.current.setData(e.data.data.returnsValue);
      }
      //returnsValue
      if (e.data.data.actualValue) {
        initialSeries.current = chartRef.current.addLineSeries({
          topColor: "rgba(255, 192, 0, 0.7)",
          bottomColor: "rgba(255, 192, 0, 0.3)",
          color: "rgba(255, 192, 0, 1)",
          lineWidth: 2,
        });
        initialSeries.current.setData(e.data.data.actualValue);
      }
      chartRef?.current?.timeScale().fitContent();
      // alert(
      //   "3init" +
      //     JSON.stringify(initialSeries.current + finalSeries.current) +
      //     "***return***"
      // );
    });
    return () => {
      chartRef.current.remove();
      document.removeEventListener("webview-graphData", () => {
        finalSeries.current &&
          chartRef.current.removeSeries(finalSeries.current);
        initialSeries.current &&
          chartRef.current.removeSeries(initialSeries.current);
      });
    };
  }, []);
  useEffect(() => {
    document.addEventListener("webview-hwData", (e) => {
      let hValue = e?.data?.data?.height;
      let wValue = e?.data?.data?.width;
      // alert(`${hValue} ${wValue}`);
      if (hValue && wValue) {
        if (isFullscreen) {
          if (hValue > wValue) {
            chartRef?.current?.applyOptions({
              width: parseInt(hValue),
              height: parseInt(wValue) > 250 ? 250 : hValue,
            });
          } else {
            chartRef?.current?.applyOptions({
              width: parseInt(wValue),
              height: parseInt(hValue) > 250 ? 250 : hValue,
            });
          }
        } else {
          chartRef?.current?.applyOptions({
            width: parseInt(wValue),
            height: parseInt(hValue) > 250 ? 250 : hValue,
          });
        }
      }
      // else {
      //   if (isFullscreen) {
      //     // alert(window.screen.width+' '+window.innerWidth)
      //     chartRef?.current?.applyOptions({
      //       width: window.innerWidth,
      //       height: window.innerHeight,
      //     });
      //   } else {
      //     chartRef?.current?.applyOptions({
      //       width: 380,
      //       height: 250,
      //     });
      //   }
      // }
    });
    return () => {
      document.removeEventListener("webview-hwData", () => {});
    };
    //  width: 360,
    //  height: 250,
    // autoSize: true,
  }, [isFullscreen]);

  return (
    <div
      style={{
        width: isFullscreen ? "100vw" : "fit-content",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
      }}
      ref={chartContainerRef}
    >
      <FullscreenToggle
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
    </div>
  );
};
