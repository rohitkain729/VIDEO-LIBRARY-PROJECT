import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BarChart, type BarLabelProps, type BarProps } from '@mui/x-charts/BarChart';
import { useAnimate, useAnimateBar, useDrawingArea } from '@mui/x-charts/hooks';
import { PiecewiseColorLegend } from '@mui/x-charts/ChartsLegend';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import Box from '@mui/material/Box';
import axios from 'axios';


export default function ShinyBarChartHorizontal() {

  const[vData,setVData]=React.useState([{
    CategoryId:0,
    CategoryName:"",
    VideoCount:0
  }]);
  

  React.useEffect(()=>{
    axios.get("http://localhost:4000/videocategorycount").then((res)=>{setVData(res.data)});
  });

  return (
    <Box sx={{ width: '100%',backgroundColor:'white',padding:'20px',borderRadius:'20px' }}>
      <Typography sx={{ marginBottom: 2 }}>
        VIDEOS COUNTS ON CATEGORIES
      </Typography>


      <BarChart

        height={300}
        dataset={vData}

        series={[
          {
            id: 'turnout',
            dataKey: 'VideoCount',
            stack: 'voter turnout',
            valueFormatter: (value: number | null) => `${value}%`,
            barLabel: (v) => `${v.value}`,
          },
        ]}

        layout="horizontal"
        xAxis={[
          {
            id: 'color',
            min: 0,
            max: 30,
            colorMap: {
              type: 'piecewise',
              thresholds: [50, 85],
              colors: ['#d32f2f', '#78909c', '#1976d2'],
            },
            valueFormatter: (value: number) => `${value}`,
          },
        ]}

        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'CategoryName',
            width: 140,
          },
        ]}

        slots={{
          legend: PiecewiseColorLegend,
          barLabel: BarLabelAtBase,
          bar: BarShadedBackground,
        }}

        slotProps={{
          legend: {
            axisDirection: 'x',
            markType: 'square',
            labelPosition: 'inline-start',
            labelFormatter: ({ index }) => {
              if (index === 0) {
                return 'lowest turnout';
              }
              if (index === 1) {
                return 'average';
              }
              return 'highest turnout';
            },
          },
        }}
      />
    </Box>
  );
}

export function BarShadedBackground(props: BarProps) {

  const {
    ownerState,
    skipAnimation,
    id,
    dataIndex,
    xOrigin,
    yOrigin,
    seriesId,
    ...other
  } = props;

  const theme = useTheme();

  const animatedProps = useAnimateBar(props);
  const { width } = useDrawingArea();
  return (
    <React.Fragment>
      <rect
        {...other}
        fill={(theme.vars || theme).palette.text.primary}
        opacity={theme.palette.mode === 'dark' ? 0.05 : 0.1}
        x={other.x}
        width={width}
      />
      <rect
        {...other}
        filter={ownerState.isHighlighted ? 'brightness(120%)' : undefined}
        opacity={ownerState.isFaded ? 0.3 : 1}
        data-highlighted={ownerState.isHighlighted || undefined}
        data-faded={ownerState.isFaded || undefined}
        {...animatedProps}
      />
    </React.Fragment>
  );
}

const Text = styled('text')(({ theme }) => ({
  ...theme?.typography?.body2,
  stroke: 'none',
  fill: (theme.vars || theme).palette.common.white,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  textAnchor: 'start',
  dominantBaseline: 'central',
  pointerEvents: 'none',
  fontWeight: 600,
}));

function BarLabelAtBase(props: BarLabelProps) {
  const {
    seriesId,
    dataIndex,
    color,
    isFaded,
    isHighlighted,
    classes,
    xOrigin,
    yOrigin,
    x,
    y,
    width,
    height,
    layout,
    skipAnimation,
    ...otherProps
  } = props;

  const animatedProps = useAnimate(
    { x: xOrigin + 8, y: y + height / 2 },
    {
      initialProps: { x: xOrigin, y: y + height / 2 },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element: SVGTextElement, p) => {
        element.setAttribute('x', p.x.toString());
        element.setAttribute('y', p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return <Text {...otherProps} {...animatedProps} />;
}
