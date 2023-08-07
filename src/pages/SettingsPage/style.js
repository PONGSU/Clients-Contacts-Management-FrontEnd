import styled from "styled-components";

export const StyledSettingsPage = styled.div`
  display: flex;
  flex-direction: column;
  h3{
    font-size: 23px;
    color: ${({ theme }) => theme.colors.white};
  }

  article{
    display: flex;
    gap: 70px;
  }

  section{
    margin-top: 30px;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 420px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.separator00};
        .config-text{            
            font-size: 14px;
            color: ${({ theme }) => theme.colors.grey100};
            input{
                width: 6ch;
                padding: 5px 9px;
                border-radius: 4px;
                background-color: ${({ theme }) => theme.colors.back200};
                border: none;
                color: ${({ theme }) => theme.colors.white};
            }
            input::placeholder {
                color: ${({ theme }) => theme.colors.separator00};
            }
        }
        div{            
            border-bottom: none;
            padding: 0px;
            max-width: max-content;
            display: flex;
            gap: 13px;
            justify-content: flex-end;
            svg{
                color: ${({ theme }) => theme.colors.grey100};
            }
            svg:hover{
                color: ${({ theme }) => theme.colors.white};
            }
        }
    }
  }
    .filter{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: ${({ theme }) => theme.colors.grey100};
        .tuto{
            display: none;
        }
        input{
            padding: 5px 9px;
            border-radius: 4px;
            background-color: ${({ theme }) => theme.colors.back200};
            border: none;
            color: ${({ theme }) => theme.colors.white};
            }
        input::placeholder {
            color: ${({ theme }) => theme.colors.separator00};
        }
        .tuto-call:hover{
            color: ${({ theme }) => theme.colors.white};
            .tuto{
                display: flex;
                flex-direction: column;
                gap: 7px;
                padding: 13px;
                background-color: ${({ theme }) => theme.colors.separator00};
                border-radius: 8px;
                border: 1px solid ${({ theme }) => theme.colors.separator01};
                right: 200px;
                margin-top: 10px;
                position: absolute;
                z-index: 9999;
                p{
                    color: ${({ theme }) => theme.colors.yellowButton};
                }
            }

        }        
  }
.counter{
    svg{
        color: ${({ theme }) => theme.colors.white};
        font-size: 15px;
        transform: rotate(90deg);
        margin-left: 5px;
    }    
}
`