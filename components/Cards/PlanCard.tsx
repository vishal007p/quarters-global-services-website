import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface VisaPlan {
  id: number;
  title: string;
  processingTime: string;
  price: string;
  serviceFee: string;
  isPopular?: boolean;
  isPriority?: boolean;
}

const PlanCard = ({ plan }: { plan: VisaPlan }) => {
  const primaryColor = '#D20F21';

  return (
    <Card
      className={`
        flex flex-col h-full border 
        ${plan.isPriority ? `border-[${primaryColor}] shadow-lg` : 'border-gray-200'} 
        rounded-xl 
        hover:shadow-xl 
        transition-shadow duration-300
      `}
    >
      <CardHeader
        className={`
          ${plan.isPriority ? `bg-[${primaryColor}]/10` : ''}
          rounded-t-xl
        `}
      >
        <CardTitle className="flex justify-between items-center text-lg font-semibold">
          {plan.title}
          {plan.isPopular && (
            <Badge className={`bg-[${primaryColor}] text-white px-2 py-1 rounded-full`}>
              Popular
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow py-6 px-4">
        <div className="mb-4">
          <Badge
            variant="outline"
            className={`
              text-sm px-2 py-1 rounded 
              ${plan.isPriority ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-gray-100 text-gray-800'}
            `}
          >
            {plan.processingTime}
          </Badge>
        </div>
        <div className="text-3xl font-bold text-[${primaryColor}]">{plan.price}</div>
        <p className="text-sm text-muted-foreground mt-2">{plan.serviceFee}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4">
        <Button
          className={`
            w-full bg-[${primaryColor}] text-white 
            hover:bg-red-700 
            transition-colors duration-300
          `}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
