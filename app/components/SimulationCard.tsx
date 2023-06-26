import { useCallback, useState } from "react";
import { SafeSimulation, SafeSimulationListing, SafeUser } from "../types";
import Button from "./Button";
import { format } from "date-fns";


interface SimulationCardProps {
  data: SafeSimulation;
  simulation: SafeSimulation;
  onClick : (e: React.MouseEvent<HTMLDivElement>) => void
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  total: number;

}

const SimulationCard: React.FC<SimulationCardProps> = ({
  data,
  simulation,
  onClick,
  onAction,
  disabled,
  actionLabel,
  total,
  actionId = '',

}) => {
  /*
  const totalListingQty = data.simulationListings.reduce(
    (total, listing) => total + listing.listeingQty,
    0
  ); */

  /*const totalListingQty1 = () => {
    let total = 0;
    
    simulation.simulationListings?.forEach((el) => {
      total += el.listeingQty;
    });
    return total
  } */
  console.log('SimulationListings:', simulation.simulationListings);


  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  


  const formattedDate=(date: any) => {

    const formatted_Date = new Date(date);

    return `${format(formatted_Date, "PP")}`
  }



  return (
    
      <div className="flex flex-col gap-2 w-full">
        <div 
        onClick={onClick}
        className="flex items-center rounded-xl justify-center h-[250px] bg-gray-200
        col-span-1 cursor-pointer group
        "
        >
          <span>{data.title}</span>
        </div>
        <div className="font-semibold text-lg">
          {data.description}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-light">Custo total</div>
          <div className="font-semibold">
          € {total}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          {simulation && (
            <div className="font-light">Criado em</div>
          )}
          <div className="font-semibold">
            { formattedDate(data.createdAt)}
          </div>

        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}

      </div>

    
  );

}

export default SimulationCard;