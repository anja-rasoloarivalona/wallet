import React, { useState, useEffect } from "react";
import { Item, Title } from "../Dashboard-style";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { Amount } from "../../../components";
import { setDate } from "../../../functions";
import moment from "moment";
import _ from "lodash";


const Container = styled(Item)`
  display: flex;
  flex-direction: column;
`;

const StatsTitle = styled(Title)`
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const SelectContainer = styled.div`
  margin-left: 2rem;
  width: 40%;
  min-width: 12.5rem;
  width: 15rem;
  z-index: 30;

  > div {
    margin-top: 0;
    margin-bottom: 0;
    z-index: 30;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Summary = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 3rem;

  > div:first-child {
    margin-bottom: 1rem;
  }
`;

const Spacer = styled.div`
  width: 3rem;
  height: 100%;
  // background: grey;
`;

const SummaryRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SummaryItem = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.text_light};

  ${(props) => {
    if (props.expense) {
      return {
        border: "none",
      };
    }
  }};

  &.income {
    margin-right: 1rem;
  }

  .amount {
    font-size: 1.4rem;
  }
`;

const SummaryItemTitle = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.text_light};
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  height: 100%;
  width: 50%;
  min-width: 35rem;
`;

const Stats = () => {
  const {
    user: { transactions },
    categories: {  income },
    theme,
    text: { currentPage: text },
  } = useSelector((state) => state);


  const [chartData, setChartData] = useState(null);
  const [global, setGlobal] = useState({income: 0, expense: 0})


  useEffect(() => {
    if (transactions && transactions.length > 0){
      const _global = {
        expense: 0,
        income: 0
      }
      const labels = [
        setDate(moment().subtract(2, "months"), "mm-yy", "en"),
        setDate(moment().subtract(1, "months"), "mm-yy", "en"),
        setDate(moment(), "mm-yy", "en")
      ]

      const indexes = {}
      labels.forEach((p, index) => {
        indexes[p] = index
      })
      const _chartData = {
          labels,
          datasets: [
            {
              barPercentage: 1,
              barThickness: 20,
              label: "Income",
              backgroundColor: income.color,
              data: [0,0,0],
            },
            {
              barPercentage: 1,
              barThickness: 20,
              label: "Expense",
              backgroundColor: "black",
              data: [0,0,0],
            }
          ]
      }
      transactions.forEach(transaction => {
        _global[transaction.type] += parseInt(transaction.amount)
        const datasetsindex = transaction.type === 'expense' ? 1 : 0
        _chartData.datasets[datasetsindex].data[indexes[transaction.period]] += parseInt(transaction.amount)
      })

      setChartData(_chartData)
      setGlobal(_global)

    } else {
      setChartData({
        isEmpty: true,
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            barPercentage: 1,
            barThickness: 20,
            label: "Income",
            backgroundColor: theme.backgroundColor,
            data: [17, 20, 28],
          },
          // {
          //   barPercentage: 1,
          //   barThickness: 20,
          //   label: "Expense",
          //   backgroundColor: "black",
          //   data: [5, 9, 4],
          // },
        ],
      })
    } 
  }, [transactions]);



  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: chartData && !chartData.isEmpty ? true : false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      xAxes: [{
        gridLines: {
        },
    }],
    },
  };

  return (
    <Container>
      <StatsTitle>
        Stats
        <SelectContainer>
          {/* <Select
            input={{
              options: optionsA,
              isSearchable: false,
              customStyle: {
                custom_control: {
                  height: "3.8rem",
                  borderRadius: "1rem"
                } 
              }
            }}
            currentValue={filter}
            onChange={filterHandler}
          /> */}
        </SelectContainer>
      </StatsTitle>
      <Content>
        <Summary>
          <SummaryItem className="income">
            <SummaryItemTitle>Income</SummaryItemTitle>
            <Amount className="amount" value={global.income} income />
          </SummaryItem>
          <SummaryItem>
            <SummaryItemTitle>Expense</SummaryItemTitle>
            <Amount className="amount" value={global.expense} />
          </SummaryItem>
        </Summary>
        <Spacer />
        <ChartContainer>
          {chartData && (
            <Bar
              data={chartData}
              options={options}
            />
          )}

        </ChartContainer>
      </Content>
    </Container>
  );
};

export default Stats;
